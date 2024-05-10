import carSaleManagementRepo from "@/app/repo/carSaleManagement-repo";

export async function GET(request, { params }){
    console.log("HERE IS Param -------------------")
    console.log(params.carID)
    const carId = params.carID
    const car = await carSaleManagementRepo.getCarById(carId);
    return Response.json( car, { status: 200 })
}