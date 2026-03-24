using MediatR;

namespace ChapterX.Application.Likes.Commands
{
    public record AddRequest(int UserId, int StoryId) : IRequest<AddResponse>;
}
