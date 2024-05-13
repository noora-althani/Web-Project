import carSaleManagementRepo from "@/app/repo/carSaleManagement-repo";

export async function GET(request, { params }){
    console.log("HERE IS Param -------------------")
    console.log(params.carID)
    const carId = params.carID
    const car = await carSaleManagementRepo.getCarById(carId);
    return Response.json( car, { status: 200 })
}

export async function PUT(request, { params }) {
    const carID = params.carID
    const carUpdate = await request.json()
    const updatedCar = await carSaleManagementRepo.updateCar(carID, carUpdate)
    return Response.json(updatedCar, { status: 200 })
}