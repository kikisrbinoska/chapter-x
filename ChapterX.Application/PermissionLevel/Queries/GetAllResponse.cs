using ChapterX.Domain.Entities;

namespace ChapterX.Application.PermissionLevel.Queries
{
    using PermissionLevelEnum = ChapterX.Domain.Entities.PermissionLevel;

    public record GetAllResponse(IEnumerable<PermissionLevelEnum> PermissionLevels);
}
