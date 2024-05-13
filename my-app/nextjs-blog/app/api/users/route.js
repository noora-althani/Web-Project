import carSaleManagementRepo from "@/app/repo/carSaleManagement-repo";

export async function GET(request){
    const users = await carSaleManagementRepo.getUsers();
    return Response.json(users, { status: 200 })
}