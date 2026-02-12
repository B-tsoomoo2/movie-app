import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
export const popularMovies = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);
  const incrementCount = () => {
    setCount(count + 1);
  };
  return (
    <div className="ml-10">
      {count}
      <Button onClick={incrementCount}>+</Button>
    </div>
  );
};
