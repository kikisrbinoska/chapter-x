using MediatR;

namespace ChapterX.Application.Collaboration.Commands
{
    public record AddRequest(int UserId, int StoryId, string Role) : IRequest<AddResponse>;
}
