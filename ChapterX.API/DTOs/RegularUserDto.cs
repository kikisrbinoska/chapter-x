namespace ChapterX.API.DTOs
{
    public class RegularUserDto
    {
        public int UserId { get; set; }

        // Navigation
        public UserDto User { get; set; } = null!;
    }
}
