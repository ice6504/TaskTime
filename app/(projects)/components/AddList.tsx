import { useState, FC } from "react";
import { createClient } from "@/utils/supabase/client";

interface Props {
  close: () => void;
  onListAdd: (newList: {
    list_id: number;
    list_name: string;
    position: number;
  }) => void;
  board_id: string;
  listLength: number;
}

const AddList: FC<Props> = ({ close, onListAdd, listLength, board_id }) => {
  const supabase = createClient();
  const [listName, setListName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("lists")
        .insert([
          { list_name: listName, position: listLength, board_id: board_id },
        ])
        .select();

      if (error) {
        console.error("Error adding list:", error);
      } else if (data) {
        onListAdd(data[0]); // Call the parent function to update the state
        close(); // Close the form
        setListName(""); // Clear the input field
      }
    } catch (error) {
      console.error("Error adding list to Supabase:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-shrink-0 px-5 pb-5 w-80 h-fit rounded-lg bg-white/10"
    >
      <input
        type="text"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
        maxLength={30}
        placeholder="Add Your List..."
        className="input bg-transparent text-xl font-bold h-20 w-full border-none focus:outline-none"
      />
      <div className="flex justify-between">
        <button
          type="submit"
          className={`btn bg-black/50 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? (
            "Adding..."
          ) : (
            <>
              <i className="fa-solid fa-plus"></i> Add List
            </>
          )}
        </button>
        <button
          type="button"
          onClick={close}
          className="btn btn-ghost btn-circle hover:bg-error"
        >
          <i className="fa-solid fa-x fa-xl"></i>
        </button>
      </div>
    </form>
  );
};

export default AddList;
