using ChapterX.Domain.Entities;

namespace ChapterX.Application.Roles.Queries
{
    using RolesEnum = ChapterX.Domain.Entities.Roles;

    public record GetAllResponse(IEnumerable<RolesEnum> RolesList);
}
