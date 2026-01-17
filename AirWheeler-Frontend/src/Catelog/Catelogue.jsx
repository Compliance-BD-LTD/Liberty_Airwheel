import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RequireCatelogue } from "./RequireCatelogue";
// import catalogue from "../assets/images/Catatlogue/Catalogue-02.png";
import { use, useState } from "react";
import { useLocation, useOutlet, useOutletContext } from "react-router-dom";
import { ContactModal } from "../Contact Modal/ContactModal";
import { toast } from "react-toastify";

export const Catelogue = () => {
  const { cataLogue } = useOutletContext();

  const [selected, setSelected] = useState(null);

  return (
    <section className="space-y-10 my-10 px-5 min-h-[500px] ">
      <div>
        <p className="text-center md:text-5xl  text-2xl font-semibold text-cyan-500 ">
          Our Catalogue
        </p>
      </div>

      <div className="flex md:flex-wrap flex-col md:flex-row  justify-center items-center gap-10 max-w-[1340px] mx-auto">
        {!cataLogue &&
          [1, 2, 3, 4].map((item, index) => {
            return (
              <div
                key={index}
                className="skeleton h-[300px] w-[300px]  md:w-[250px]"
              ></div>
            );
          })}

        {/* onClick={() => window.location.href = item?.pdf} */}
        {cataLogue &&
          cataLogue.map((item, index) => {
            return (
              <section key={index}>
                <div
                  onClick={() => {
                    setSelected(item);

                    //get Expirey from localstorage

                    const expirey = localStorage.getItem("expirey");
                    const currentTime = Date.now();

                    console.log("Expirey", expirey);

                    // Check if expirey doesn't exist OR if current time has passed the expirey time
                    const isExpired = !expirey || currentTime > Number(expirey);

                    if (isExpired) {
                      // If expired, clear the old value and open the modal
                      localStorage.removeItem("expirey");

                      setTimeout(() => {
                        const modal = document.getElementById("ContactModal");
                        if (modal) modal.checked = true;
                      }, 300);
                    } else {
                      // If NOT expired, allow the download
                      if (item?.pdf) {
                        window.location.href = item.pdf;
                      } else {
                        toast.error("Sorry, no catalogue available 😞");
                      }
                    }
                  }}
                  key={index}
                  className="relative group w-[300px] cursor-pointer hover:scale-105 transition-all duration-300"
                >
                  {/* Image */}
                  <img
                    src={
                      item?.imageUrl[0] ||
                      "https://www.evokepump.com/upload/info/20240903/66d65e2c75017.jpg"
                    }
                    alt=""
                  />

                  {/* Title */}
                  <p className="group-hover:underline text-lg text-center font-semibold text-gray-700 mt-2">
                    {item?.name} <FontAwesomeIcon icon={faDownload} />
                  </p>

                  {/* Hover Buttons (Visible only in /dashboard) */}
                </div>

                {/* <RequireCatelogue></RequireCatelogue> */}
              </section>
            );
          })}

        <ContactModal selected={selected}></ContactModal>

        {cataLogue && cataLogue.length == 0 && (
          <p className="font-semibold text-2xl text-gray-600 text-center  md:mt-20 ">
            No Catalogue Available 😔
          </p>
        )}
      </div>
    </section>
  );
};
