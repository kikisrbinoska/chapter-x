namespace ChapterX.Application.Roles.Queries
{
    using RolesEnum = ChapterX.Domain.Entities.Roles;

    public record GetResponse(RolesEnum? Role);
}
