import carSaleManagementRepo from "@/app/repo/carSaleManagement-repo";

export async function GET(request, { params }){
    console.log("HERE IS PARAMA -------------------")
    console.log(params.userID)
    const userID = params.userID
    const users = await carSaleManagementRepo.getUserById(userID);
    return Response.json(users, { status: 200 })    
}