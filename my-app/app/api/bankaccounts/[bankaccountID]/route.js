import carSaleManagementRepo from "@/app/repo/carSaleManagement-repo";

export async function GET(request, { params }){
    
    const custId = params.bankaccountID
    const cust = await carSaleManagementRepo.getBankAccountByCustId(custId);
    return Response.json(cust, { status: 200 })
}

//update bank account
export async function PUT(request, { params }) {
    const bankaccountno = params.bankaccountID
    console.log(params)
    const accountUpdate = await request.json()
    const updatedBankAccount = await carSaleManagementRepo.updateBankAccount(bankaccountno, accountUpdate)
    return Response.json(updatedBankAccount, { status: 200 })
}