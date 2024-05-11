import carSaleManagementRepo from "@/app/repo/carSaleManagement-repo";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  let filterType = [...searchParams.keys()][0];
  let value = searchParams.get(filterType);
  let cars;
  if (filterType == "model") {
    cars = await carSaleManagementRepo.getCarsByName(value);
  } else {
    cars = await carSaleManagementRepo.getCars();
  }
  return Response.json(cars, { status: 200 });
}

export async function POST(request) {
  const car = await request.json();
  const newCars = await carSaleManagementRepo.addCar(car);
  return Response.json(newCars, { status: 200 });
}

// export async function POST(request, { params }){
//   //hard coded car to be added

//   let fakeCar = {
//       model_name: "Tesla Model S",
//       year: "2024-01-01T00:00:00Z",
//       price: 75000.00,
//       stock: 10,
//       image: "https://www.topgear.com/sites/default/files/2022/03/TopGear%20-%20Tesla%20Model%20Y%20-%20003.jpg",
//       manufacturerIDFK: 1,
//       sellerIDFK: 1
//     }
    

//   let newCar = await carSaleManagementRepo.addCar(fakeCar)
//   return Response.json(newCar, { status: 201 })
// }
