using System.Data;

namespace ChapterX.API.DTOs
{
    public class CollaborationDto
    {
        public int UserId { get; set; }
        public int StoryId { get; set; }
        public DateTime CreatedAt { get; set; }

        // Navigation
        public UserDto User { get; set; } = null!;
        public StoryDto Story { get; set; } = null!;
        public ICollection<RolesDto> Roles { get; set; } = [];
        public ICollection<PermissionLevelDto> PermissionLevels { get; set; } = [];
    }
}
