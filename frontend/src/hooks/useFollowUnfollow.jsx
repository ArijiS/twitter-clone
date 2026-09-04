import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useFollowUnfollow = () => {
    const queryClient = useQueryClient();

    const { mutate:followUser, isPending } = useMutation( {
        mutationFn: async ( userId ) => {
            try{
                const res = await fetch( `/api/users/follow/${userId}`,
                    {
                        method: "POST",
                    }
                 );
                 const data = await res.json();
                 if( !res.ok || data.error ){
                    throw new Error( data.error );
                 };
                 return data;
            }
            catch( error ){
                console.error( error.message );
                throw error;
            }
        },
        onSuccess: () => {            
                queryClient.invalidateQueries( {queryKey: [ "authUser" ]} )
            },
        onError: ( error ) => {
            toast.error( error.message );
        }
    } );
    return { followUser, isPending }
};

export default useFollowUnfollow;