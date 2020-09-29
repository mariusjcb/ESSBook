using AutoMapper;
using Domain;

namespace Application.Activities
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Activity, ActivityDTO>();
            CreateMap<UserActivity, AttendeeDTO>()
                .ForMember(x => x.Username, m => m.MapFrom(s => s.AppUser.UserName))
                .ForMember(x => x.DisplayName, m => m.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(x => x.Image, m => m.MapFrom(s => s.AppUser.Image));
        }
    }
}