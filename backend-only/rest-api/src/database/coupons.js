import Coupon from "../models/coupon.js";

export const getCoupons = async () => {
  console.log("GET request received in database");
  const coupons = await Coupon.find().catch((error) => {
    console.log(error);
    throw { status: 500, message: error?.message || error };
  });
  //console.log(coupons);
  return coupons;
};

export const getCouponById = async (id) => {
  console.log(`GET request received for id ${id} in database`);
  const coupons = await Coupon.findById(id).catch((error) => {
    console.log(error);
    throw { status: 500, message: error?.message || error };
  });
  //console.log(coupons);
  return coupons;
};

export const createCoupon = async (coupon) => {
  console.log("POST request received in database");
  let newCoupon = new Coupon(coupon);
  newCoupon = newCoupon
    .save()
    .then(() => {
      console.log(
        `Coupon ${coupon.name} created successfully with id ${coupon._id}`
      );
    })
    .catch((error) => {
      console.log(error);
      throw { status: 500, message: error?.message || error };
    });
};

export const updateCoupon = async (id, coupon) => {
  console.log(`PATCH request received for id ${id} in database`);
  await Coupon.updateOne({ _id: id }, coupon).catch((error) => {
    console.log(error);
    throw { status: 500, message: error?.message || error };
  });
};

export const deleteCoupon = async (id) => {
  console.log(`DELETE request received for id ${id} in database`);
  await Coupon.deleteOne({ _id: id }).catch((error) => {
    console.log(error);
    throw { status: 500, message: error?.message || error };
  });
};
