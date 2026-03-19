namespace ChapterX.API.DTOs
{
    public class GenreDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;

        // Navigation
        public ICollection<HasGenreDto> HasGenres { get; set; } = [];
    }
}
