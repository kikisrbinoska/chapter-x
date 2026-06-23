using MediatR;
using System.ComponentModel.DataAnnotations;

namespace ChapterX.Application.Comment.Commands
{
    public record AddRequest(
        [Required][MaxLength(2000)] string Content,
        int UserId,
        int StoryId
    ) : IRequest<AddResponse>;
}
