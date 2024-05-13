import carSaleManagementRepo from "@/app/repo/carSaleManagement-repo";

export async function GET(request){
    const customers = await carSaleManagementRepo.getBankAccounts();
    return Response.json(customers, { status: 200 })
}