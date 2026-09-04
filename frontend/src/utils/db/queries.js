export const authUserQueryFn = async () => {
      try{
        const res = await fetch( "/api/auth/me" );
        const data = await res.json();
        if( !res.ok || data.error ){
          throw new Error( data.error );
        }
        console.log( "Auth user", data );
        return data;
      } 
      catch( error ){
        console.error( error.message );
        throw error;
      }

    };

export const postsQueryFn = async ( feedType ) => {
try{
  const res = await fetch( `/api/posts/${feedType}` );
  const data = await res.json();
  if( !res.ok || data.error ){
    throw new Error( data.error );
  }
  return data;
}
catch( error ){
  console.error( error.message );
  throw error;
}
};

export const deletePostFn = async( post ) => {
      try{
        const res = await fetch( `/api/posts/${post._id}`, {
          method: "DELETE"
        } );
        const data = await res.json();
        if( data.error || !res.ok ){
          throw new Error( data.error );
        };
      }
      catch( error ){
        console.error( error.message );
        throw error;
      }
    };

export const createPostFn = async ( { text, img } ) => {

  try{
    const res = await fetch( "/api/posts/create", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify( { text, img } )
    } );
    const data = await res.json();
    if( data.error || !res.ok ){
      throw new Error( data.error );
    };
    return data;
  }
  catch( error ){
    console.error( error.message );
    throw error;
  }

};

export const getSuggestedUsersFn = async () => {
  try{
    const res = await fetch("/api/users/suggested");
    const data = await res.json();
    if( data.error || !res.ok ){
      throw new Error( data.error );
    };
    return data;
  }
  catch( error ){
    console.error( error.message );
    throw error;
  }
}