import axios from "axios";
import { BaseURL } from "../utils/constants";
import { useEffect, useState } from "react";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState("");

  const SILVER_PRICE = 199;
  const GOLD_PRICE = 399;

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(BaseURL + "/premium/verify", {
        withCredentials: true,
      });

      if (res.data.isPremium) {
        setIsUserPremium(true);
      }
    } catch (err) {
      console.error("Premium verification error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyClick = async (type) => {
    try {
      setBuying(type);

      const order = await axios.post(
        BaseURL + "/payment/create",
        {
          membershipType: type,
        },
        {
          withCredentials: true,
        }
      );

      const { amount, keyId, currency, notes, orderId } = order.data;

      const options = {
        key: keyId,
        amount,
        currency,
        name: "TalentLink",
        description: "TalentLink Premium Membership",
        order_id: orderId,

        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
          contact: "9999999999",
        },

        theme: {
          color: "#F37254",
        },

        handler: verifyPremiumUser,
      };

      const rzp = new window.Razorpay(options);

      rzp.open();

      rzp.on("payment.failed", (response) => {
        console.error("Payment failed:", response.error);
      });
    } catch (err) {
      console.error("Payment error:", err);
    } finally {
      setBuying("");
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Already Premium
  if (isUserPremium) {
    return (
      <div className="flex justify-center items-center min-h-[70vh] px-4">
        <div className="card bg-base-300 shadow-xl max-w-lg w-full">
          <div className="card-body text-center items-center">

            <div className="text-6xl mb-3">
              👑
            </div>

            <h1 className="text-3xl font-bold">
              You're a Premium Member!
            </h1>

            <p className="opacity-70 mt-2">
              Enjoy all the premium features available on TalentLink.
            </p>

            <div className="mt-5">
              <span className="badge badge-primary badge-lg">
                Premium Active
              </span>
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-10">

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">

        <div className="text-5xl mb-4">
          ✨
        </div>

        <h1 className="text-4xl md:text-5xl font-bold">
          Upgrade Your TalentLink Experience
        </h1>

        <p className="mt-4 text-lg opacity-70">
          Connect with more people, build your network and unlock
          premium features.
        </p>

      </div>

      {/* Membership Cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">

        {/* ================= SILVER ================= */}
        <div className="card bg-base-300 shadow-xl border border-base-content/10 h-full">

          <div className="card-body flex flex-col">

            {/* Title */}
            <div className="flex justify-between items-center">

              <h2 className="text-3xl font-bold">
                Silver
              </h2>

              <span className="badge badge-neutral">
                3 Months
              </span>

            </div>

            {/* Description */}
            <p className="opacity-70 mt-2">
              Perfect for getting started with premium networking.
            </p>

            {/* Price */}
            <div className="mt-6 flex items-baseline gap-2">

              <span className="text-4xl font-bold">
                ₹{SILVER_PRICE}
              </span>

              <span className="opacity-60">
                / 3 months
              </span>

            </div>

            <div className="divider"></div>

            {/* Features */}
            <ul className="space-y-4 text-base">

              <li className="flex gap-3">
                <span>✓</span>
                <span>Chat with other members</span>
              </li>

              <li className="flex gap-3">
                <span>✓</span>
                <span>10 connection requests per day</span>
              </li>

              <li className="flex gap-3">
                <span>✓</span>
                <span>Premium profile badge</span>
              </li>

              <li className="flex gap-3">
                <span>✓</span>
                <span>Access to premium networking features</span>
              </li>

              <li className="flex gap-3">
                <span>✓</span>
                <span>3 months of premium access</span>
              </li>

            </ul>

            {/* Button */}
            <div className="card-actions mt-auto pt-8">

              <button
                onClick={() => handleBuyClick("silver")}
                disabled={buying === "silver"}
                className="btn btn-neutral w-full"
              >

                {buying === "silver" ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Processing...
                  </>
                ) : (
                  `Choose Silver - ₹${SILVER_PRICE}`
                )}

              </button>

            </div>

          </div>
        </div>


        {/* ================= GOLD ================= */}
        <div className="card bg-base-300 shadow-2xl border-2 border-warning relative h-full">

          {/* Recommended */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">

            <span className="badge badge-warning badge-lg px-5">
              ⭐ Recommended
            </span>

          </div>

          <div className="card-body flex flex-col">

            {/* Title */}
            <div className="flex justify-between items-center mt-2">

              <h2 className="text-3xl font-bold">
                Gold
              </h2>

              <span className="badge badge-warning">
                6 Months
              </span>

            </div>

            {/* Description */}
            <p className="opacity-70 mt-2">
              Get the complete TalentLink networking experience.
            </p>

            {/* Price */}
            <div className="mt-6 flex items-baseline gap-2">

              <span className="text-4xl font-bold">
                ₹{GOLD_PRICE}
              </span>

              <span className="opacity-60">
                / 6 months
              </span>

            </div>

            <div className="divider"></div>

            {/* Features */}
            <ul className="space-y-4 text-base">

              <li className="flex gap-3">
                <span>✓</span>
                <span>Everything in Silver</span>
              </li>

              <li className="flex gap-3">
                <span>✓</span>
                <span>Unlimited connection requests</span>
              </li>

              <li className="flex gap-3">
                <span>✓</span>
                <span>Chat with your connections</span>
              </li>

              <li className="flex gap-3">
                <span>✓</span>
                <span>Premium profile badge</span>
              </li>

              <li className="flex gap-3">
                <span>✓</span>
                <span>Higher visibility in networking</span>
              </li>

              <li className="flex gap-3">
                <span>✓</span>
                <span>6 months of premium access</span>
              </li>

            </ul>

            {/* Button */}
            <div className="card-actions mt-auto pt-8">

              <button
                onClick={() => handleBuyClick("gold")}
                disabled={buying === "gold"}
                className="btn btn-warning w-full"
              >

                {buying === "gold" ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Processing...
                  </>
                ) : (
                  `Choose Gold - ₹${GOLD_PRICE}`
                )}

              </button>

            </div>

          </div>
        </div>

      </div>

      {/* Bottom message */}
      <div className="text-center mt-12 opacity-60">

        <p>
          🔒 Secure payment powered by Razorpay
        </p>

        <p className="text-sm mt-2">
          You will be redirected to the secure Razorpay payment window.
        </p>

      </div>

    </div>
  );
};

export default Premium;