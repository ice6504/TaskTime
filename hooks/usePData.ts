"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

interface PDataProps {
  board_id: string;
}

interface CardData {
  card_id: number;
  card_name: string;
  position_card: number;
  description: string;
  startDate: string;
  endDate: string;
}

interface ListData {
  list_id: number;
  list_name: string;
  position: number;
  cards: CardData[];
}

interface User {
  username: string;
  avatar_url: string;
  email: string
}

interface ProjectData {
  title: string;
  lists: ListData[];
}

export const usePData = ({ board_id }: PDataProps) => {
  const [data, setData] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("boards")
          .select(
            `
              title,
              lists(
                list_id, list_name, position,
                cards(card_id,card_name, position_card, description, startDate, endDate)
              )
            `
          )
          .eq("board_id", board_id)
          .limit(1)
          .single();
        if (error) throw error;
        setData(data || null);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [board_id, supabase]);

  return { data, loading, error };
};
