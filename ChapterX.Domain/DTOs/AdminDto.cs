namespace ChapterX.API.DTOs
{
    public class AdminDto
    {
        public int UserId { get; set; }

        // Navigation
        public UserDto User { get; set; } = null!;
    }
}
