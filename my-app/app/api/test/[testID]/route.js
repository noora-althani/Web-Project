import carSaleManagementRepo from "@/app/repo/carSaleManagement-repo";

export async function GET(request, {params}){
    console.log('TESTING HERE ---------------')
    console.log(params.testID)
    const output = await carSaleManagementRepo.getCarsBySellerId(params.testID);//go in orders lits group by unique custoers and couts quantity
    return Response.json(output, { status: 200 })
}