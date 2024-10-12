import { useState, FC } from "react";
import { createClient } from "@/utils/supabase/client";

interface Props {
  close: () => void;
  list_id: number;
  maxPosition: number;
  onCardAdd: (list_id: number, newCard: any) => void;
}

const AddCard: FC<Props> = ({ close, list_id, maxPosition, onCardAdd }) => {
  const supabase = createClient();
  const [cardName, setCardName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardName.trim()) {
      setError("Card name cannot be empty");
      return; // Prevent submission if the input is empty
    }

    setLoading(true);
    setError(null); // Reset error state

    try {
      const { data, error: insertError } = await supabase
        .from("cards")
        .insert([
          {
            card_name: cardName,
            position_card: maxPosition,
            list_id: list_id,
          },
        ])
        .select();

      if (insertError) {
        console.error("Error adding card:", insertError);
        setError("Failed to add card. Please try again.");
      } else if (data) {
        onCardAdd(list_id, data[0]); // Pass the new card to the parent component
        close(); // Close the AddCard form
      }
    } catch (err) {
      console.error("Error adding card to Supabase:", err);
      setError("Failed to add card. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl text-black space-y-2">
      <input
        type="text"
        value={cardName}
        onChange={(e) => setCardName(e.target.value)}
        placeholder="Enter a title for this card..."
        className="input bg-white/50 placeholder:text-gray-600 h-20 w-full border-none focus:outline-none"
      />
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex justify-between items-center font-semibold">
        <button
          type="submit"
          className={`btn bg-black/50 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add card"}
        </button>
        <button
          type="button"
          onClick={close}
          className="btn btn-ghost btn-circle hover:bg-error"
        >
          <i className="fa-solid fa-x"></i>
        </button>
      </div>
    </form>
  );
};

export default AddCard;
