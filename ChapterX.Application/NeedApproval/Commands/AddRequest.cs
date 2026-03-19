using MediatR;

namespace ChapterX.Application.NeedApproval.Commands
{
    public record AddRequest(int StoryId, int AdminId) : IRequest<AddResponse>;
}
