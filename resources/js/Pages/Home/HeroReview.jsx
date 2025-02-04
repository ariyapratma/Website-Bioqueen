import { usePage } from "@inertiajs/react";
import Avatar from "react-avatar";
import { FaStar } from "react-icons/fa";
import { useEffect } from "react";
import Swal from "sweetalert2";

const HeroReview = () => {
  const { props } = usePage();
  const { dataHeroReview = [], success } = props;

  useEffect(() => {
    if (success) {
      Swal.fire({
        title: "Success!",
        text: success,
        icon: "success",
        confirmButtonText: "OK",
      });
    }
  }, [success]);

  return (
    <div className="flex flex-col items-center p-4 sm:p-6">
      <h1 className="mb-4 font-lexend text-3xl font-semibold text-black md:mb-6 md:text-5xl">
        Reviews
      </h1>
      <p className="mb-8 max-w-xl text-center font-lexend text-sm text-gray-600 sm:mb-10 md:text-base">
        Kami yakin bahwa kepercayaan dan ulasan positif dari pelanggan adalah
        bukti nyata dari komitmen kami yang kuat terhadap kesuksesan klien.
      </p>

      <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
        {dataHeroReview.length > 0 ? (
          dataHeroReview.map((dataHeroReview, index) => (
            <div
              key={index}
              className="flex max-w-[85%] transform flex-col items-center rounded-lg bg-white p-4 text-center shadow-lg transition-transform duration-300 hover:scale-105 sm:max-w-xs"
            >
              {/* <Avatar
                name={dataHeroReview?.name}
                src={
                  dataHeroReview?.avatar
                    ? `/storage/${dataHeroReview?.avatar}`
                    : null
                }
                size="64"
                round={true}
                className="mb-4"
              /> */}
              <h6 className="mb-1 font-lexend text-lg font-medium sm:mb-2 sm:text-xl">
                {dataHeroReview?.name}
              </h6>
              <div className="mb-2 flex">
                {[...Array(dataHeroReview?.rating)].map((star, i) => (
                  <FaStar key={i} className="text-custom-yellow" />
                ))}
              </div>
              <p className="font-lexend text-xs text-gray-600 sm:text-sm">
                {dataHeroReview?.comment}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center font-lexend font-medium text-red-500">
            No reviews available.
          </p>
        )}
      </div>
    </div>
  );
};

export default HeroReview;
