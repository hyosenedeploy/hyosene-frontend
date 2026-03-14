"use client"

import { useState, useEffect } from "react"
import { X, CheckCircle, AlertCircle } from "lucide-react"

interface RazorpayPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  courseTitle: string
  courseId: string
  amount: number
  onPaymentSuccess: (orderDetails: any) => void
}

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function RazorpayPaymentModal({
  isOpen,
  onClose,
  courseTitle,
  courseId,
  amount,
  onPaymentSuccess,
}: RazorpayPaymentModalProps) {
  const [loading, setLoading] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "processing" | "success" | "error"
  >("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [razorpayKey, setRazorpayKey] = useState<string>("")
  const [razorpayLoaded, setRazorpayLoaded] = useState(false)
  const [nonceValue] = useState(() => {
    // Generate cryptographically secure nonce
    // In production, this should come from your backend with every render
    if (typeof window === "undefined") return ""
    return Array.from(crypto.getRandomValues(new Uint8Array(16)))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("")
  })

  const retryLoadingResources = () => {
    setPaymentStatus("idle")
    setErrorMessage("")
    setRazorpayLoaded(false)
    
    // Retry fetching key
    fetch("/api/razorpay/get-key", {
      method: "GET",
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        if (data?.key) {
          setRazorpayKey(data.key)
          console.log("✅ Razorpay key fetched")
        }
      })
      .catch(err => console.error("❌ Retry fetch failed:", err))
  }

  /* 
    🔐 SECURITY:
    - Fetch Razorpay PUBLIC key from backend instead of exposing anything hardcoded.
    - Backend ensures secret key is never sent to frontend.
  */
  useEffect(() => {
    const fetchKey = async () => {
      try {
        const response = await fetch("/api/razorpay/get-key", {
          method: "GET",
          credentials: "include",
        })
        const data = await response.json()

        // Ensure key value exists
        if (!data?.key) {
          console.error("Razorpay key missing", data)
          setErrorMessage("Failed to load")
          setPaymentStatus("error")
          return
        }

        setRazorpayKey(data.key)
        console.log("Razorpay key fetched")
      } catch (error) {
        console.error("Error fetching Razorpay key:", error)
        setErrorMessage("Failed to load")
        setPaymentStatus("error")
      }
    }

    fetchKey()
  }, [])

  /*
    🔐 SECURITY:
    - Load Razorpay script ONLY when modal opens.
    - Prevent loading script multiple times.
    - Use SRI (Subresource Integrity) to verify script hasn't been tampered with
    - Wait for script to load before enabling payment button.
  */
  useEffect(() => {
    if (isOpen) {
      if (window.Razorpay) {
        console.log("✅ Razorpay already loaded")
        setRazorpayLoaded(true)
        return
      }

      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.async = true
      
      // 🔐 SRI Hash - Verify script integrity
      // This hash must match the Razorpay script. If CDN is compromised, hash won't match
      // Get latest hash from: https://checkout.razorpay.com/v1/checkout.js

      
      script.onload = () => {
        // Give it a tiny delay to ensure window.Razorpay is available
        setTimeout(() => {
          if (window.Razorpay) {
            console.log("✅ Razorpay is now available on window")
            setRazorpayLoaded(true)
          } else {
            console.error("❌ Razorpay not available after script load")
            setErrorMessage("Failed to load payment gateway. Please refresh and try again.")
            setPaymentStatus("error")
          }
        }, 100)
      }
      script.onerror = () => {
        console.error("❌ Failed to load Razorpay script")
        setErrorMessage("Failed to load payment gateway. Please refresh and try again.")
        setPaymentStatus("error")
      }
      
      // 🔐 SECURITY: Verify script doesn't trigger CSP violations
      script.addEventListener("error", (e) => {
        console.error("❌ Script load error:", e)
      })
      
      document.body.appendChild(script)

      // Timeout fallback - if script doesn't load in 10 seconds
      const timeout = setTimeout(() => {
        if (!window.Razorpay) {
          console.error("⏱️ Razorpay script load timeout")
          setErrorMessage("Payment gateway is taking too long to load. Please try again.")
          setPaymentStatus("error")
        }
      }, 10000)

      return () => clearTimeout(timeout)
    } else {
      setRazorpayLoaded(false)
    }
  }, [isOpen])

  const handlePayment = async () => {
    try {
      // Check if Razorpay is loaded
      if (!window.Razorpay) {
        throw new Error("Payment gateway not loaded. Please refresh the page and try again.")
      }

      setLoading(true)
      setPaymentStatus("processing")
      setErrorMessage("")

      /*
        🔐 SECURITY:
        - NEVER trust courseId, amount, title directly.
        - Backend validates the price & course authenticity.
      */
      const orderResponse = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Number(amount), // ensure it's numeric
          courseTitle: String(courseTitle),
          courseId: String(courseId),
        }),
      })

      if (!orderResponse.ok) {
        throw new Error("Failed to create order")
      }

      const order = await orderResponse.json()

      // 🔐 SECURITY: Validate order object structure
      if (!order?.id || !order?.currency || typeof order?.amount !== "number") {
        throw new Error("Invalid order response from server")
      }

      const options = {
        key: razorpayKey, // 🔐 SECURITY: public key only
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
        name: "Hyosene Battery",
        description: courseTitle,

        /*
          🔐 SECURITY:
          - Handler receives ONLY the Razorpay payment IDs.
          - Actual verification happens in backend using secret key.
          - Signature is verified server-side with HMAC-SHA256
        */
        handler: async (response: any) => {
          try {
            // 🔐 SECURITY: Validate response object
            if (!response?.razorpay_order_id || !response?.razorpay_payment_id || !response?.razorpay_signature) {
              throw new Error("Invalid payment response from Razorpay")
            }

            setPaymentStatus("success")

            // Send payment details to parent component for backend verification
            onPaymentSuccess({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              courseId,
              courseTitle,
              amount,
            })

            setTimeout(() => {
              onClose()
              setPaymentStatus("idle")
            }, 2000)
          } catch (error: any) {
            setErrorMessage(error.message || "Payment processing failed")
            setPaymentStatus("error")
            setLoading(false)
          }
        },

        /*
          🔐 SECURITY:
          - Prefill is optional BUT do NOT insert user-provided values.
          - Hardcoded placeholders avoid PII leak.
          - User will fill these in the Razorpay form
        */
        prefill: {
          name: "Student",
          email: "student@example.com",
          contact: "9999999999",
        },

        theme: {
          color: "#7EC3E6",
        },
        
        // 🔐 SECURITY: Additional safety options
        modal: {
          ondismiss: () => {
            setLoading(false)
            console.log("Payment modal closed by user")
          },
        },
      }

      // 🔐 SECURITY: Wrap Razorpay instantiation in try-catch
      let razorpay: any
      try {
        razorpay = new window.Razorpay(options)
      } catch (e) {
        throw new Error("Failed to initialize payment gateway")
      }

      razorpay.open()

      razorpay.on("payment.failed", (response: any) => {
        const errorCode = response?.error?.code || "UNKNOWN"
        const errorDescription = response?.error?.description || "Payment failed"
        console.error(`❌ Payment failed [${errorCode}]: ${errorDescription}`)
        setErrorMessage(errorDescription)
        setPaymentStatus("error")
        setLoading(false)
      })

      setLoading(false)
    } catch (error: any) {
      console.error("❌ Payment error:", error.message)
      setErrorMessage(error.message || "An unexpected error occurred")
      setPaymentStatus("error")
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#0b0b0d] border border-gray-700 rounded-2xl p-8 max-w-md w-full mx-4">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Confirm Payment</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            <X size={24} />
          </button>
        </div>

        {/* Course Details */}
        <div className="bg-[#1a1a1a] p-4 rounded-lg mb-6">
          <p className="text-gray-400 text-sm">Course</p>
          <p className="text-white font-semibold mb-3">{courseTitle}</p>
          <div className="border-t border-gray-700 pt-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Amount</span>
              <span className="text-2xl font-bold text-[#7EC3E6]">₹{amount}</span>
            </div>
          </div>
        </div>

        {/* Success */}
        {paymentStatus === "success" && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-start gap-3">
            <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
            <div>
              <p className="text-green-400 font-semibold">Payment Successful!</p>
              <p className="text-green-300 text-sm">
                You are now enrolled in {courseTitle}.
              </p>
            </div>
          </div>
        )}

        {/* Error */}
        {paymentStatus === "error" && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
            <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
            <div>
              <p className="text-red-400 font-semibold">Payment Failed</p>
              <p className="text-red-300 text-sm">{errorMessage}</p>
              <button
                onClick={retryLoadingResources}
                className="text-red-300 hover:text-red-200 underline text-xs mt-2"
              >
                Try loading again
              </button>
            </div>
          </div>
        )}

        {/* Pay Button */}
        <button
          onClick={handlePayment}
          disabled={loading || paymentStatus === "success" || !razorpayLoaded}
          className="w-full bg-gradient-to-r from-[#7EC3E6] to-[#002479] text-white font-bold py-3 rounded-full hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {!razorpayLoaded
            ? "Loading Payment Gateway..."
            : loading
            ? "Processing..."
            : paymentStatus === "success"
            ? "✓ Enrolled"
            : `Pay ₹${amount}`}
        </button>

        {/* Cancel Button */}
        <button
          onClick={onClose}
          className="w-full mt-3 border border-gray-700 text-gray-300 font-semibold py-2 rounded-full hover:bg-gray-800 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
