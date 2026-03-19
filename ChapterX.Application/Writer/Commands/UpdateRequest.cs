using MediatR;

namespace ChapterX.Application.Writer.Commands
{
    public record UpdateRequest(int Id, string Bio) : IRequest<UpdateResponse>;
}
