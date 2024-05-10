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
