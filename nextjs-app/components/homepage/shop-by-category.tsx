import React from "react";
import Typography from "../ui/typography";
import Image from "next/image";

const ShopyByCategory = () => {
  return (
    <section>
      <Typography variant={"heading"}>Shop categories</Typography>
      {/*  image with text on top */}
      <div className="relative">
        <Image src={"/images/shop-by-category.png"} alt={"shop by category"} />
        <Typography variant={"description"}>
          Casual wear
        </Typography>
      </div>
    </section>
  );
};

export default ShopyByCategory;
