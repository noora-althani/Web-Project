import carSaleManagementRepo from "@/app/repo/carSaleManagement-repo";

export async function GET(request){
    const sellers = await carSaleManagementRepo.getSellers();
    return Response.json(sellers, { status: 200 })
}