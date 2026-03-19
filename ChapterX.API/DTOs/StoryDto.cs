using Microsoft.AspNetCore.DataProtection.KeyManagement;
using System.Net.NetworkInformation;
using System.Xml.Linq;

namespace ChapterX.API.DTOs
{
    public class StoryDto
    {
        public int Id { get; set; }
        public bool MatureContent { get; set; }
        public string ShortDescription { get; set; } = string.Empty;
        public string? Image { get; set; }
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // FK
        public int UserId { get; set; }
        // Navigation
        public WriterDto Writer { get; set; } = null!;
        public ICollection<StatusDto> Statuses { get; set; } = [];
        public ICollection<ChapterDto> Chapters { get; set; } = [];
        public ICollection<HasGenreDto> HasGenres { get; set; } = [];
        public ICollection<LikesDto> Likes { get; set; } = [];
        public ICollection<CommentDto> Comments { get; set; } = [];
        public ICollection<CollaborationDto> Collaborations { get; set; } = [];
        public ICollection<AISuggestionDto> AISuggestions { get; set; } = [];
        public ICollection<NotifyDto> Notifies { get; set; } = [];
        public ICollection<ReadingListItemsDto> ReadingListItems { get; set; } = [];
        public ICollection<NeedApprovalDto> NeedApprovals { get; set; } = [];
    }
}
