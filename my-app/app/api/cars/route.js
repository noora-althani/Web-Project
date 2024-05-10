import carSaleManagementRepo from "@/app/repo/carSaleManagement-repo";

export async function GET(request){
    const cars = await carSaleManagementRepo.getCars();
    return Response.json(cars, { status: 200 })
}