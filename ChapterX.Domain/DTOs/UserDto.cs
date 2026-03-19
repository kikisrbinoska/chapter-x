using ChapterX.Domain.DTOs;

namespace ChapterX.API.DTOs
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // Navigation
        public AdminDto? Admin { get; set; }
        public RegularUserDto? RegularUser { get; set; }
        public WriterDto? Writer { get; set; }
        public ICollection<ReadingListDto> ReadingLists { get; set; } = [];
        public ICollection<LikesDto> Likes { get; set; } = [];
        public ICollection<CommentDto> Comments { get; set; } = [];
        public ICollection<CollaborationDto> Collaborations { get; set; } = [];
        public ICollection<NotifyDto> Notifies { get; set; } = [];
    }
}
