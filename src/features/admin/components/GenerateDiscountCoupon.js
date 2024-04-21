import React, { useState, useEffect } from 'react'

const GenerateDiscountCoupon = () => {

      const [loading, setLoading] = useState(false);

      const [coupons, setCoupons] = useState([]);

      useEffect(() => {
            const fetchCoupons = async () => {
                  const response = await fetch('http://localhost:8080/coupons');
                  const data = await response.json();
                  setCoupons(data);
            }
            fetchCoupons();
      }, [coupons]);

      const addDiscountCoupon = async (e) => {
            e.preventDefault();
            const coupon = e.target.coupon.value.toUpperCase();
            const discountPercentage = e.target['discount-percentage'].value;
            console.log(coupon, discountPercentage);
            setLoading(true);

            const response = await fetch('http://localhost:8080/coupons/add', {
                  method: 'POST',
                  headers: {
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                        coupon,
                        discountPercentage,
                  }),
            });
            setLoading(false);
            if (response.ok) {
                  alert('Coupon added successfully');
                  e.target.coupon.value = '';
                  e.target['discount-percentage'].value = '';
            } else {
                  alert('Failed to add coupon');
            }
      }

      const toggleCouponStatus = async (e) => {
            setLoading(true);
            const couponCode = e.target.parentElement.parentElement.children[0].innerText;

            const coupon = coupons.find(coupon => coupon.code === couponCode);
            console.log(coupon);
            const response = await fetch(`http://localhost:8080/coupons/${coupon.active ? "deactivate" : "activate"}/${coupon._id}`, {
                  method: 'POST',
                  headers: {
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                        active: !coupon.active,
                  }),
            });
            setLoading(false);
            if (response.ok) {
                  alert('Coupon status updated successfully');
            } else {
                  alert('Failed to update coupon status');
            }
      }

      const deleteCoupon = async (e) => {
            setLoading(true);
            const couponCode = e.target.parentElement.parentElement.children[0].innerText;

            const coupon = coupons.find(coupon => coupon.code === couponCode);
            console.log(coupon);
            const response = await fetch(`http://localhost:8080/coupons/delete/${coupon._id}`, {
                  method: 'DELETE',
            });
            setLoading(false);
            if (response.ok) {
                  alert('Coupon deleted successfully');
            } else {
                  alert('Failed to delete coupon');
            }
      }

      return (
            <div>
                  <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={addDiscountCoupon}>
                        <h2 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Manage Discount Coupons</h2>
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">

                              <div className="sm:col-span-2">
                                    <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
                                          Coupon
                                    </label>
                                    <div className="mt-2.5">
                                          <input
                                                type="text"
                                                name="coupon"
                                                id="coupon"
                                                className="uppercase block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 font-bold shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                          />
                                    </div>
                              </div>
                              <div className="sm:col-span-2">
                                    <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                                          Discount Percentage
                                    </label>
                                    <div className="mt-2.5">
                                          <input
                                                type="number"
                                                name="discount-percentage"
                                                id="discount-percentage"
                                                min="1"
                                                max="100"
                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                          />
                                    </div>
                              </div>

                        </div>
                        <div className="mt-10">
                              <button
                                    type="submit"
                                    className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                    {loading ? 'Please wait...' : 'Add Coupon'}
                              </button>
                        </div>
                  </form>

                  <div class="relative overflow-x-auto mt-8">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-700 ">
                              <thead class="text-md text-gray-900 uppercase bg-gray-50  ">
                                    <tr>
                                          <th scope="col" class="px-6 py-3">
                                                Coupon Code
                                          </th>
                                          <th scope="col" class="px-6 py-3">
                                                Discount Percentage
                                          </th>
                                          <th scope="col" class="px-6 py-3">
                                                Deactivate
                                          </th>
                                          <th scope="col" class="px-6 py-3">
                                                Delete
                                          </th>
                                    </tr>
                              </thead>
                              <tbody>
                                    {
                                          coupons.length > 0 && coupons.map((coupon) => (
                                                <>
                                                      <tr class="bg-white border-b ">
                                                            <td class={`px-6 py-4 font-semibold text-gray-900 whitespace-nowrap ${coupon.active ? null : "line-through"}`}>
                                                                  {coupon.code}
                                                            </td>
                                                            <td class="px-6 py-4 font-semibold">
                                                                  {coupon.discount}%
                                                            </td>
                                                            <td class="px-6 py-4">
                                                                  <button class={`${coupon.active ? "text-red-500" : "text-green-500"}`} onClick={toggleCouponStatus}>{coupon.active ? "Deactivate" : "Activate"}</button>
                                                            </td>
                                                            <td class="px-6 py-4">
                                                                  <button class="text-red-500" onClick={deleteCoupon}>Delete</button>
                                                            </td>
                                                      </tr>
                                                </>
                                          ))
                                    }
                              </tbody>
                        </table>
                  </div>

            </div>
      )
}

export default GenerateDiscountCoupon