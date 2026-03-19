using MediatR;

namespace ChapterX.Application.Writer.Commands
{
    public record DeleteRequest(int Id) : IRequest<DeleteResponse>;
}
