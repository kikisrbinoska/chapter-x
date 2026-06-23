using MediatR;
using System.ComponentModel.DataAnnotations;

namespace ChapterX.Application.Story.Commands
{
    public record AddRequest(
        bool MatureContent,
        [Required][MaxLength(500)] string ShortDescription,
        [MaxLength(2048)] string? Image,
        [Required] string Content,
        int UserId,
        List<string> Genres
    ) : IRequest<AddResponse>;
}
