import carSaleManagementRepo from "@/app/repo/carSaleManagement-repo";

export async function GET(request){
    const mans = await carSaleManagementRepo.getManufacturers();
    return Response.json(mans, { status: 200 })
}