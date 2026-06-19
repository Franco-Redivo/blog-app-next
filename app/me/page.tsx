import { generateToken } from "../actions/users";
import { getCurrentUser } from "../services/session";
import { redirect } from "next/navigation";

const MePage = async () => {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <section className="max-w-3xl mx-auto flex flex-col items-center mt-16 border border-slate-300 rounded shadow-sm p-8 gap-12">
            <div className="flex flex-col items-start w-full gap-4 border-b ">
                <h1 className="font-bold text-3xl">My Profile</h1>
                <div className="flex flex-col gap-4 text-lg mb-8">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Username:</strong> {user.username}</p>
                </div>
            </div>
            <div className="flex flex-col w-full gap-4">
                <h2 className="text-xl font-bold">API Token</h2>
                <div className="self-center bg-slate-100 w-full p-6 rounded mb-2">
                    {user.token ? (
                        <>
                            <p className="text-lg"><strong>Current Token:</strong></p>
                            <p className="bg-slate-200 p-4 rounded mt-4">{user?.token}</p>
                        </>

                    ) : (
                        <p className="bg-slate200 p-4 rounded mt-4">No token generated yet</p>
                    )}
                </div>
                <form action={generateToken}>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                        Generate New Token
                    </button>
                </form>
            </div>
        </section>
    )
}

export default MePage;