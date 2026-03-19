using MediatR;

namespace ChapterX.Application.Comment.Commands
{
    public record AddRequest(string Content, int UserId, int StoryId) : IRequest<AddResponse>;
}
