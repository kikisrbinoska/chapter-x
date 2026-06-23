using MediatR;
using System.ComponentModel.DataAnnotations;

namespace ChapterX.Application.Chapter.Commands
{
    public record AddRequest(
        [Range(1, int.MaxValue)] int Number,
        [Required][MaxLength(200)] string Name,
        [Required][MaxLength(300)] string Title,
        [Required] string Content,
        int StoryId
    ) : IRequest<AddResponse>;
}
