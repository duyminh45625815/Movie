"use client"

import { useEffect, useState } from "react"
import BookingNavigation from "@/components/booking/booking-navigation"
import BookingSummary from "@/components/booking/booking-summary"
import SelectSeat from "@/components/booking/select-seat"
import SelectFood from "@/components/booking/select-food"
import Payment from "@/components/booking/payment"
import Confirmation from "@/components/booking/confirmation"
import { getFoods } from "@/lib/actions"
import { FoodItem, Ticket, TypeSeat, Showtime, UserType } from "@/types"
import {  useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

interface BookingProp {
  getShowtime: Showtime
}

export default function BookingPage({ getShowtime: getShowtime }: BookingProp) {
  const session = useSession();
  const [FOOD_ITEMS, setFOOD_ITEMS] = useState<FoodItem[]>([]);
  const [booking, setBooking] = useState<Ticket>({
    _id: "",
    status: "pending",
    user: session.data?.user.id as UserType | undefined,
    totalPrice: 0,
    createdAt: new Date(),
    showtime: getShowtime ? {
      _id: getShowtime._id,
      films: getShowtime.films,
      theater: getShowtime.theater,
      rooms: getShowtime.rooms,
      dateAction: new Date(getShowtime.dateAction),
      startTime: new Date(getShowtime.startTime).toLocaleTimeString(),
      endTime: new Date(getShowtime.endTime).toLocaleTimeString(),
      price: getShowtime.price,
      availableSeats: getShowtime.seats.length,
      status: getShowtime.status,
      seats: getShowtime.seats,
    } : {
      _id: "",
      films: undefined,
      theater: undefined,
      rooms: undefined,
      dateAction: new Date(),
      startTime: "",
      endTime: "",
      price: "",
      availableSeats: 0,
      status: "",
      seats: [],
    },
    seats: [],
    combo: [],
    paymentMethod: "",
    currentStep: 1,
  });

  useEffect(() => {
    if (getShowtime) {
      setBooking((prev) => ({
        ...prev,
        showtime: {
          _id: getShowtime._id,
          films: getShowtime.films,
          theater: getShowtime.theater,
          rooms: getShowtime.rooms,
          dateAction: new Date(getShowtime.dateAction),
          startTime: new Date(getShowtime.startTime).toLocaleTimeString(),
          endTime: new Date(getShowtime.endTime).toLocaleTimeString(),
          price: getShowtime.price,
          availableSeats: getShowtime.seats.length,
          status: getShowtime.status,
          seats: getShowtime.seats,
        },
      }));

    }
  }, [getShowtime]);


  useEffect(() => {
    if (session.data?.user) {
      setBooking((prev) => ({
        ...prev,
        user: {
          id: session.data.user.id as string,
          email: session.data.user.email as string,
          role: session.data.user.role as string,
          firstName: session.data.user.name as string,
          lastName: session.data.user.name as string,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          __v: 0,
        },
      }));
    }
  }, []);



  useEffect(() => {
    const fetchFoods = async () => {
      const dataFood = await getFoods() as FoodItem[];
      setFOOD_ITEMS(dataFood);
    };
    fetchFoods();
  }, []);



  const setStep = (step: number) => {
    setBooking((prev) => ({
      ...prev,
      currentStep: step,
    }));
  };

  const nextStep = () => {
    setBooking((prev) => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, 5),
    }));
  };

  const prevStep = () => {
    setBooking((prev) => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 1),
    }));
  };

  const addSeat = (seat: TypeSeat) => {
    setBooking((prev) => ({
      ...prev,
      seats: [...prev.seats, seat],
    }));
  };

  const removeSeat = (seat: TypeSeat) => {
    setBooking((prev) => ({
      ...prev,
      seats: prev.seats.filter((s) => !(s.row === seat.row && s.number === seat.number)),
    }));
  };
  const updateFoodQuantity = (foodId: string, quantity: number) => {
    if (quantity === 0) {
      setBooking((prev) => ({
        ...prev,
        combo: prev.combo.filter((f) => f.food._id !== foodId),
      }));
      return;
    }
    const existingItem = booking.combo.find((f) => f.food._id === foodId);

    if (existingItem) {
      setBooking((prev) => ({
        ...prev,
        combo: prev.combo.map((f) => (f.food._id === foodId ? { ...f, quantity } : f)),
      }));
    } else {
      const foodItem = FOOD_ITEMS.find((f) => f._id === foodId);
      if (foodItem) {
        setBooking((prev) => ({
          ...prev,
          combo: [...prev.combo, { food: foodItem, quantity }],
        }));
      }
    }
  };

  const setPaymentMethod = (method: string) => {
    setBooking((prev) => ({
      ...prev,
      paymentMethod: method,
    }));
  };

  const getTotalPrice = (getShowtime: Showtime) => {
    const seatPrice = booking.seats.length * Number(getShowtime.price);
    const foodPrice = booking.combo.reduce((total, item) => total + item.food.price * item.quantity, 0);
    return Number(seatPrice + foodPrice);
  };

  const router = useRouter()
  const handlePayment = async () => {
    try {
      const response = await fetch('/api/momo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id:booking._id,
          totalPrice: getTotalPrice(getShowtime),
          seats: booking.seats,
          combo: booking.combo,
          showtime: booking.showtime,
          user:booking.user as UserType
        }),
      });
      const data = await response.json();
      if (data.momoResponse.payUrl) {
        const updatedBooking = { ...booking, currentStep: 4 };
       localStorage.setItem('bookingState', JSON.stringify(updatedBooking));
       localStorage.setItem("bookingId",data.bookingId)
        router.push(data.momoResponse.payUrl);
      }
    } catch (error) {
      console.error('Error creating payment:', error);
    }
  };
  useEffect(() => {
    const savedState = localStorage.getItem('bookingState');
    console.log('Saved State:', savedState);
    if (savedState) {
      setBooking(JSON.parse(savedState));
      localStorage.removeItem('bookingState');
    }
  }, []);
  const handleConfirmation = () => {
    if (booking.currentStep === 3) {
      handlePayment();
    }
  };



  const renderStepContent = () => {
    switch (booking.currentStep) {
      case 1:
        return <SelectSeat booking={booking} selectedSeats={booking.seats} availableSeats={booking.showtime.seats} addSeat={addSeat} removeSeat={removeSeat} />;
      case 2:
        return <SelectFood selectedFood={booking.combo} foodItems={FOOD_ITEMS} updateFoodQuantity={updateFoodQuantity} />;
      case 3:
        return <Payment paymentMethod={booking.paymentMethod} setPaymentMethod={setPaymentMethod} />;
      case 4:
        return <Confirmation booking={booking} getTotalPrice={() => getTotalPrice(getShowtime)} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <BookingNavigation currentStep={booking.currentStep} setStep={setStep} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">{renderStepContent()}</div>

        <div>
          <BookingSummary
            booking={booking}
            getTotalPrice={() => getTotalPrice(getShowtime)}
            nextStep={nextStep}
            prevStep={prevStep}
            showBackButton={booking.currentStep > 1}
            showNextButton={booking.currentStep < 4}
            nextButtonText={booking.currentStep === 4 ? "Xác nhận" : "Tiếp tục"}
            onConfirmation={handleConfirmation}
           
          />
        </div>
      </div>
    </div>
  );
}