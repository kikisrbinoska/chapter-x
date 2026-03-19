using ChapterX.API.DTOs;

namespace ChapterX.Domain.DTOs
{
    public class WriterDto
    {
        public int UserId { get; set; }

        // Navigation
        public UserDto User { get; set; } = null!;
        public ICollection<StoryDto> Stories { get; set; } = [];
    }
}
