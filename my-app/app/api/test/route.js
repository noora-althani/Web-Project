import carSaleManagementRepo from "@/app/repo/carSaleManagement-repo";

export async function GET(request){
    console.log('TESTING HERE ---------------')
    const output = await carSaleManagementRepo.customersTop3Orders();//go in orders lits group by unique custoers and couts quantity
    return Response.json(output, { status: 200 })
}