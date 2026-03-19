namespace ChapterX.Application.PermissionLevel.Queries
{
    using PermissionLevelEnum = ChapterX.Domain.Entities.PermissionLevel;

    public record GetResponse(PermissionLevelEnum? PermissionLevel);
}
