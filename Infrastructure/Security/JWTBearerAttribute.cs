using System;
using Microsoft.AspNetCore.Authorization;

namespace Infrastructure.Security
{
    [AttributeUsage(
            AttributeTargets.Class | AttributeTargets.Method,
            AllowMultiple = false,
            Inherited = true
        )]
    public class JWTBearer : AuthorizeAttribute
    {
        public JWTBearer() : base()
        {
            AuthenticationSchemes = "Bearer";
        }
    }
}