using MediatR;

namespace ChapterX.Application.Writer.Commands
{
    public record AddRequest(int UserId, string Bio) : IRequest<AddResponse>;
}
