using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using Infrastructure.Security;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace Application.User
{
    public class CurrentUser
    {
        public class Query : IRequest<User> { }

        public class Handler : IRequestHandler<Query, User>
        {
            private readonly IJWTGenerator _jwtGenerator;
            private readonly IUserAccessor _userAccessor;
            private readonly UserManager<AppUser> _userManager;
            public Handler(UserManager<AppUser> userManager, IJWTGenerator jwtGenerator, IUserAccessor userAccessor)
            {
                this._userManager = userManager;
                this._userAccessor = userAccessor;
                this._jwtGenerator = jwtGenerator;
            }

            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByNameAsync(_userAccessor.GetCurrentUsername());

                return new User
                {
                    DisplayName = user.DisplayName,
                    Username = user.UserName,
                    Token = _jwtGenerator.CreateToken(user),
                    Image = null
                };
            }
        }
    }
}