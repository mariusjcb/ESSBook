using System;
using Microsoft.AspNetCore.Authorization;

[
    AttributeUsage
    (
        AttributeTargets.Class | AttributeTargets.Method,
        AllowMultiple = false,
        Inherited = true
    )
]
public class JWTBearer : AuthorizeAttribute
{
    public JWTBearer() : base()
    {
        AuthenticationSchemes = "Bearer";
    }
}